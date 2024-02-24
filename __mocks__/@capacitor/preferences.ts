export const Preferences = {
  async get(data: { key: string }): Promise<{ value: string | undefined }> {
    return { value: undefined };
  },

  async set(data: { key: string; value: string }): Promise<void> {},
  async remove(data: { key: string }): Promise<void> {},
  async clear(): Promise<void> {},
  async keys(): Promise<any> {
    return { keys: [] };
  },
};
