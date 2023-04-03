export interface NftOwner {
  name: string;
  email: string;
  address: string;
}

export interface Royalty {
  author: string;
  fraction: number;
}

export interface NftAttribute {
  trait_type: string;
  value: any;
}

export interface Nft {
  id: string;
  imageUrl: string;
  type: number;
  owner: NftOwner;
  royalties: Royalty[];
  name: string;
  description: string;
  category: string;
  isDrops: boolean;
  attributes: NftAttribute[];

}



export interface NftSymply {

}
