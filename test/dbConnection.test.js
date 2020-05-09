const mongoose = require('mongoose');
const connectDB = require('../config/db');

jest.mock('mongoose');

describe('connectDB', () => {
  it('should connect to the database successfully', async () => {
    const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});
    const mockConsoleExit = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const mongooseConnectSpyOn = jest
      .spyOn(mongoose, 'connect')
      .mockImplementation(() => {
        throw new Error('message');
      });

    await connectDB();

    expect(mongooseConnectSpyOn).toHaveBeenCalled();
    expect(mockConsoleExit).toHaveBeenCalledWith('message');
    expect(mockExit).toHaveBeenCalledWith(1);
  });
});
