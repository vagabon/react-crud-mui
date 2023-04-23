import { UuidUtils } from './UuidUtils';

describe('UUID UTILS - ', () => {
  test('Given UuidUtils When createUUID is called Then return an generated uuid', () => {
    const tested = UuidUtils.createUUID();
    expect(tested).not.toBeNull();
  });
});
