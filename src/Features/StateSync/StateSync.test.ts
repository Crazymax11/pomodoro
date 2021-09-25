import { defaultSettings } from '../../store/settings';
import { TimerState } from '../../store/timer';
import { TimeEntryType } from '../types';
import { LOCAL_STORAGE_KEY, StateSync } from './StateSync';

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};
// @ts-ignore
global.localStorage = localStorageMock;
const dataToSave = {
  entry: {
    type: TimeEntryType.Pomodoro,
    startTime: Date.now(),
    completedTime: 0,
  },
  stats: { entries: [] },
  timer: TimerState.Active,
  settings: defaultSettings,
};
const dataToBeSaved = {
  v: 1,
  data: { ...dataToSave, timer: TimerState.Paused },
};

describe('StateSync', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('должен сохранить данные стора', () => {
    StateSync.save(dataToSave);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      LOCAL_STORAGE_KEY,
      JSON.stringify(dataToBeSaved),
    );
  });
  it('должен загрузить данные из стора', () => {
    localStorageMock.getItem.mockImplementationOnce(() => JSON.stringify(dataToBeSaved));

    expect(StateSync.load()).toEqual(dataToBeSaved.data);
  });
  it('должен загрузить данные из стора старого формата (без фичефлагов)', () => {
    localStorageMock.getItem.mockImplementationOnce(() => {
      const dataWithoutFeatureFlags = {
        ...dataToBeSaved.data,
        settings: {
          ...dataToBeSaved.data.settings,
          featureFlags: undefined,
        },
      };
      return JSON.stringify(dataWithoutFeatureFlags);
    });

    expect(StateSync.load()).toEqual(dataToBeSaved.data);
  });
  it('должен загрузить данные из стора старого формата (без настроек)', () => {
    localStorageMock.getItem.mockImplementationOnce(() => {
      const dataWithoutSettings = {
        ...dataToBeSaved.data,
        settings: undefined,
      };
      return JSON.stringify(dataWithoutSettings);
    });

    expect(StateSync.load()).toEqual(dataToBeSaved.data);
  });

  it('должен вернуть null если по ключу ничего нет', () => {
    localStorageMock.getItem.mockImplementationOnce(() => null);

    expect(StateSync.load()).toEqual(null);
  });
  it('должен вернуть null если по ключу не JSON', () => {
    localStorageMock.getItem.mockImplementationOnce(() => 'kek');

    expect(StateSync.load()).toEqual(null);
  });
  it('должен вернуть null если по ключу JSON но не наш', () => {
    localStorageMock.getItem.mockImplementationOnce(() => '{"kek":true}');

    expect(StateSync.load()).toEqual(null);
  });
});
