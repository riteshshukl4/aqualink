/**
 * Represents a geographical location with latitude and longitude coordinates.
 */
export interface Location {
  /**
   * The latitude of the location.
   */
  lat: number;
  /**
   * The longitude of the location.
   */
  lng: number;
}

/**
 * Represents directions between two locations.
 */
export interface Directions {
  /**
   * The distance in meters.
   */
distanceMeters: number;
  /**
   * The estimated travel time in seconds.
   */
durationSeconds: number;
  /**
   * The instructions.
   */	
instructions: string;
}

/**
 * Asynchronously retrieves directions between two locations.
 *
 * @param origin The starting location.
 * @param destination The destination location.
 * @returns A promise that resolves to a Directions object containing distance, duration and instructions.
 */
export async function getDirections(origin: Location, destination: Location): Promise<Directions> {
  // TODO: Implement this by calling an API.

  return {
    distanceMeters: 1000,
    durationSeconds: 600,
	instructions: 'Go straight for 1km',
  };
}
