import { NextRequest, NextResponse } from 'next/server';
import { inMemoryClaims, validateClaimId, validateInstallationId } from '../../utils';

export async function POST(_: NextRequest, { params }: { params: Promise<{ installationId: string, claimId: string }> }) {
    const { installationId, claimId } = await params;
   
    if (!validateInstallationId(installationId) || !validateClaimId(claimId)) {
        return NextResponse.json({ description: 'Operation failed because of a conflict with the current state of the resource' }, { status: 409 });
    }
    
    const matchingClaim = inMemoryClaims.find(c => (c.claimId == claimId && c.installationId == installationId));

    if (!matchingClaim) {
        return NextResponse.json({ description: 'Claim not found' }, { status: 404 });
    }

    matchingClaim.status = 'complete';

    return NextResponse.json({ description: 'Claim completed successfully' }, { status: 204 });
}
