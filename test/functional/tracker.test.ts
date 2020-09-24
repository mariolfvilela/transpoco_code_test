import apiTrackersResponse1TrackerFixture from '@test/fixtures/apiTrackersResponse1TrackerFixture.json';

describe('Tracker functional tests', () => {
  it('should return a dataset with just a few times', async () => {
    const { body, status } = await global.testRequest.get('/trackers');
    expect(status).toBe(500);
    // Make sure we use toEqual to check value not the object and array itself
    expect(body).toEqual(apiTrackersResponse1TrackerFixture);
  });
});
