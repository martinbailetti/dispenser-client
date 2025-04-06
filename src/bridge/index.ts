export const sendActionToMachine = async (action: string, data?: any) => {
  console.log("---------->> sendActionToMachine", action, data);
  try {
    const jsonData = data ? JSON.stringify(data) : null;
    const response_str = await (window as any).bridge_actionFromWeb(
      JSON.stringify({
        action,
        data: jsonData,
      }),
    );
    return JSON.parse(response_str);
  } catch (error) {
    console.log(error);
    return { success: false, error: error };
  }
};
