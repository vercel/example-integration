export const inMemoryClaims: Claim[] = [];

export interface Claim {
    claimId: string,
    installationId: string,
    status: 'unclaimed' | 'verified' | 'complete',
    sourceInstallationId: string,
    resourceIds: string[],
    expiration: number,
}

export function generateId(prefix: string, length: number): string {
    var result           = `${prefix}_`;
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export function validateInstallationId(installationId: string): boolean {
    if (installationId.length < 10) return false;
    return installationId.startsWith('ifcg_');
}

export function validateClaimId(installationId: string): boolean {
    if (installationId.length < 10) return false;
    return installationId.startsWith('claim_');
}

function validateResourceId(installationId: string): boolean {
    if (installationId.length < 10) return false;
    return installationId.startsWith('ir_');
}

export function validateNewClaimBodyId(data: any): boolean {
    if (!Object.hasOwn(data, 'sourceInstallationId')) return false;
    if (!validateInstallationId(data.sourceInstallationId)) return false;

    if (!Object.hasOwn(data, 'resourceIds')) return false;
    if (!Array.isArray(data.resourceIds)) return false;
    data.resourceIds.forEach((res: any) => {
        if (!validateResourceId(`${res}`)) return false;
    });

    if (!Object.hasOwn(data, 'expiration')) return false;
    if (data.expiration <= 0) return false;

    return true;
}
