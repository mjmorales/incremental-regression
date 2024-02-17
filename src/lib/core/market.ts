import type { TickableResource } from "./resource";

export interface Purchaseable {
  cost: number;
  currency: TickableResource;
  product: TickableResource;
  // costScaling is a multiplier for the cost of the purchase
  // that takes the current amount of product into account
  costScaling: number;
  onBuy?: () => void;
}

export interface MarketOptions {
  purchases: Purchaseable[];
}

export const scaledCost = (purchase: Purchaseable): number => {
  const amount = purchase.product.getTotalProduced();
  // we use the costScaling to calculate the cost of the next purchase
  //
  // TODO: we should look into allowing the user to specify a custom
  // costScaling function instead of just a pow multiplier
  const cost = purchase.cost * Math.pow(purchase.costScaling, amount);
  // we round the cost to 2 decimal places to avoid breaking the UI.
  const final = Math.round((cost + Number.EPSILON) * 100) / 100

  return final;
}

export class Market {
  private purchases: Purchaseable[];

  constructor(options: MarketOptions) {
    this.purchases = options.purchases;
  }

  purchase(purchase: Purchaseable): void {
    const cost = scaledCost(purchase);
    if (purchase.currency.getTotalProduced() < cost) {
      return;
    }

    purchase.currency.decrement(cost);
    purchase.product.manualIncrement();
    if (purchase.onBuy) {
      purchase.onBuy();
    }
  }

  getPurchases(): Purchaseable[] {
    return this.purchases;
  }

  addPurchase(purchase: Purchaseable): void {
    this.purchases.push(purchase);
  }

  removePurchase(purchase: Purchaseable): void {
    const index = this.purchases.indexOf(purchase);
    if (index > -1) {
      this.purchases.splice(index, 1);
    }
  }
}
