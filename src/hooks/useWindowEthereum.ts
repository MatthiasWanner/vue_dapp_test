const useWindowEthereum = () => {
  const ethereum = (window as any).ethereum

  return { ethereum }
}

export default useWindowEthereum
