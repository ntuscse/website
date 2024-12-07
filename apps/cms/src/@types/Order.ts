//current impl                      https://stackoverflow.com/questions/43909566/get-keys-of-a-typescript-interface-as-array-of-strings
//maintain separate tuple           https://stackoverflow.com/questions/66565322/get-type-keys-in-typescript
//custom external library (broken?) https://stackoverflow.com/questions/43909566/get-keys-of-a-typescript-interface-as-array-of-strings

export class Order {
  constructor(
    public id = '',
    public transactionId = '',
    public transactionTime = '',
    public paymentMethod = '',
    public customerEmail = '',
    public status = '',
    public updatedAt = '',
    public createdAt = ''
  ) { }
}
