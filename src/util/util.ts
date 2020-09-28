export class Util {
  /**
   * Compares two Date objects
   * @param date1 First date object to compare.
   * @param date2 Second date object to compare.
   */
  public static validateDate(start?: Date, end?: Date): boolean {
    if (!start || !end) {
      // throw new TrackerRepositoryInternalError('Non-standard dates');
      return false;
    }

    // With Date object we can compare dates them using the >, <, <= or >=.
    // The ==, !=, ===, and !== operators require to use date.getTime(),
    // so we need to create a new instance of Date with 'new Date()'
    const d1 = new Date(start);
    const d2 = new Date(end);

    // Check if the dates are equal
    if (d1.getTime() === d2.getTime()) {
      //throw new TrackerRepositoryInternalError('Same dates');
      return false;
    }

    // Check if the first is less than second
    if (d1 < d2) {
      //throw new TrackerRepositoryInternalError('End date greater than the start date');
      return false;
    }

    return true;
  }
}
