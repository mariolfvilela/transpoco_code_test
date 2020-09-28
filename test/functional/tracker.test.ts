//import apiTrackersResponse1TrackerFixture from '@test/fixtures/apiTrackersResponse1TrackerFixture.json';
import { Tracker } from '@src/models/tracker';

describe('Tracker functional tests', async () => {
  it('should return a list of Trackers', async () => {
    const { body, status } = await global.testRequest.get('/trackers');
    expect(status).toBe(200);
    // Make sure we use toEqual to check value not the object and array itself
    //expect(body).toContain(apiTrackersResponse1TrackerFixture);
    expect((body as Tracker[]).length > 1).toBeTruthy();
  });
});
