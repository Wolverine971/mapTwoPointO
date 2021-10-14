export interface BingResp {
  authenticationResultCode: string;
  brandLogoUri: string;
  copyright: string;
  resourceSets: ResourceSet[];
  statusCode: number;
  statusDescription: string;
  traceId: string;
}

export interface ResourceSet {
  estimatedTotal: number;
  resources: Resource[];
}

export interface Resource {
  __type: string;
  value: BingValue[];
}

export interface BingValue {
  __type: string;
  address: Address;
  name?: string;
}

export interface Address {
  countryRegion: string;
  locality?: string;
  adminDistrict: string;
  adminDistrict2?: string;
  countryRegionIso2: string;
  formattedAddress: string;
  postalCode?: string;
  addressLine?: string;
}

export interface TigerResp {
  type: string;
  features: Feature[];
}

export interface Feature {
  type: string;
  geometry: Geometry;
}

export interface Geometry {
  type: string;
  coordinates: number[][][];
  rings?: any[]
}




