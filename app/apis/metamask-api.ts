interface personalSignFunction {
  (ethereum: any, address: string): Promise<string>;
}

export const personalSign: personalSignFunction = async (ethereum, message) => {
  try {
    const result = await ethereum.request({
      method: 'personal_sign',
      params: [ethereum.selectedAddress, message],
      from: ethereum.selectedAddress
    });
    console.log('signPersonal', result);
    return result;

  } catch (error) {
    console.error(error);
    throw error;
  }
};
