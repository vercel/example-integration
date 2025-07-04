import { NextRequest, NextResponse } from 'next/server';
import { Claim, generateId, inMemoryClaims, validateInstallationId, validateNewClaimBodyId } from '../utils';

// NOTE - overload #2 to create a claim - this route gets the claimID from the path
export async function POST(request: NextRequest, { params }: { params: Promise<{ installationId: string, claimId: string }> }) {
    const { installationId, claimId } = await params;
    const data = await request.json();

    const matchingClaim = inMemoryClaims.find(c => (c.claimId == claimId && c.installationId == installationId));

    if (matchingClaim) {
        return NextResponse.json({ description: 'Operation failed because of a conflict with the current state of the resource' }, { status: 409 });
    }

    if (!validateInstallationId(installationId) || !validateNewClaimBodyId(data)) {
        return NextResponse.json({ description: 'Input has failed validation' }, { status: 400 });
    }

    var expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);
    const newClaim: Claim = {
        claimId: generateId('claim', 20), 
        installationId, 
        status: 'unclaimed',
        sourceInstallationId: data.sourceInstallationId,
        expiration: data.expiration,
        resourceIds: data.resourceIds,
    }
    inMemoryClaims.push(newClaim);

    return NextResponse.json({ description: 'Claim created successfully' });
}

// NOTE - this GET is not part of the spec but makes it much easier to test
export async function GET(_: NextRequest, { params }: { params: Promise<{ installationId: string, claimId: string }> }) {
    const { installationId, claimId } = await params;

    const matchingClaim = inMemoryClaims.find(c => (c.claimId == claimId && c.installationId == installationId));

    if (matchingClaim) {
        return NextResponse.json(matchingClaim);
    }

    return NextResponse.json({ description: 'Claim not found' }, { status: 404 });
}
