export class ApiResult {
    constructor(item?: any) {
      if (item) {
        for (const key of Object.keys(this)) {
          this[key] = item[key];
        }
      }
    }

    total: number;
    categoryCount: Record<string,number>;
    data: Array<object>;
    error: string;
  }
