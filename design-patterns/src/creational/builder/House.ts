export default class House {
  private foundation?: string;

  private structure?: string;

  private roof?: string;

  private painted?: boolean;

  private furnished?: boolean;

  public setFoundation(foundation: string): void {
    this.foundation = foundation;
  }

  public setStructure(structure: string): void {
    this.structure = structure;
  }

  public setRoof(roof: string): void {
    this.roof = roof;
  }

  public setPainted(painted: boolean): void {
    this.painted = painted;
  }

  public setFurnished(furnished: boolean): void {
    this.furnished = furnished;
  }

  public describeHouse(): void {
    const houseProperties: string[] = [
      `Foundation: ${this.foundation}`,
      `Structure: ${this.structure}`,
      `Roof: ${this.roof}`,
      `Painted: ${this.painted}`,
      `Furnished: ${this.furnished}`,
    ];

    const houseDescription = houseProperties.join('; ');

    console.log(houseDescription);
  }
}
