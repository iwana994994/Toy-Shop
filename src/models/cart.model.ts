export interface CartItem {
  id: number;
  imageUrl:string;
  name: string;
  price: number;
  quantity: number;
  status: 'rezervisano' | 'pristiglo' | 'otkazano';
}