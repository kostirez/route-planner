export interface IGolemioFilter{


  latlng?: string;
  // Sorting by location (Latitude and Longitude separated by comma, latitude first).
  // Example: 50.124935,14.457204.

  range?: number;
  // Filter by distance from latlng in meters (range query). Depends on the latlng parameter.
  // Example: 5000.

  limit?: number;
  // Limits number of retrieved items. The maximum is 10000 (default value).
  // Example: 10.

  offset?: number;
  // Number of the first items that are skipped.
  // Example: 0.

  updatedSince?: string;
  // Filters all results with older updated_at than this parameter
  // Example: 2019-05-18T07:38:37.000Z.

  companyName?: string;
}
