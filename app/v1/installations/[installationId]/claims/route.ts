import { NextRequest, NextResponse } from 'next/server';
import { Claim, generateId, inMemoryClaims, validateClaimId, validateInstallationId, validateNewClaimBodyId } from './utils';

// NOTE - overload #1 to create a claim - this route doesn't have a claimID in the path and gets it from the request body
export async function POST(request: NextRequest, { params }: { params: Promise<{ installationId: string }> }) {
    const { installationId } = await params;
    const data = await request.json();

    if (!validateInstallationId(installationId) || !validateNewClaimBodyId(data) || !validateClaimIdInBody(data)) {
        return NextResponse.json({ description: 'Operation failed because of a conflict with the current state of the resource' }, { status: 409 });
    }

    var expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);

    const newClaim: Claim = {
        claimId: data.claimId,
        installationId, 
        status: 'unclaimed',
        sourceInstallationId: generateId('ifcg', 20),
        expiration: expirationDate.getTime(),
        resourceIds: [ generateId('res', 20) ]
    };
    inMemoryClaims.push(newClaim);

    return NextResponse.json({ description: 'Claim created successfully', claim: newClaim });
}

// NOTE - this GET is not part of the spec but makes it much easier to test
export async function GET(_: NextRequest, { params }: { params: Promise<{ installationId: string }> }) {
    const { installationId } = await params;

    return NextResponse.json({ claims: inMemoryClaims });
}

function validateClaimIdInBody(data: any): boolean {
    if (!Object.hasOwn(data, 'claimId')) return false;
    if (!validateClaimId(data.claimId)) return false;

    return true;
}