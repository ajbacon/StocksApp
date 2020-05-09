const mongoose = require('mongoose');
const connectDB = require('../config/db');

jest.mock('mongoose');

describe('connectDB', () => {
  it('should log success message to console upon successful connection', async () => {
    const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});
    const mockConsoleLog = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});
    const mongooseConnectSpyOn = jest
      .spyOn(mongoose, 'connect')
      .mockImplementation();

    await connectDB();

    expect(mongooseConnectSpyOn).toHaveBeenCalled();
    expect(mockConsoleLog).toHaveBeenCalledWith(
      'MongoDB successfully connected...'
    );
  });

  it('should exit with error code 1 with unsuccessful database connection', async () => {
    const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});
    const mockConsoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const mongooseConnectSpyOn = jest
      .spyOn(mongoose, 'connect')
      .mockImplementation(() => {
        throw new Error('message');
      });

    await connectDB();

    expect(mongooseConnectSpyOn).toHaveBeenCalled();
    expect(mockConsoleError).toHaveBeenCalledWith('message');
    expect(mockExit).toHaveBeenCalledWith(1);
  });
});
