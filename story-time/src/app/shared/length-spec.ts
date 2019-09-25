/**
 * @summary Lenght specifications for a field
 */
export class LenghtSpec {

  /**
   * @summary Default constructor
   * @param min Minimal size of the field
   * @param max Maximum size of the field
   */
  constructor(
    public min: number,
    public max: number,
  ) { }

}
