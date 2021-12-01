import { ethers } from 'ethers';

export interface ATTRInfo {
  chainId: number;
  addr: string;
}

export async function getATTRs(): Promise<ATTRInfo[]> {
  return rows.map(d => {
    return {
      ...d,
      addr: ethers.utils.getAddress(d.addr),
    }
  })
}

// Actual definitions without checks
const rows: ATTRInfo[] = [
  { chainId: 1, addr: '0x44e2deC86B9F0e0266E9AA66e10323A2bd69CF9A' },
  { chainId: 137, addr: '0x0335DeFC8A1977b99488e0b5f5c6bc3D44fAcdD4' },
  { chainId: 4, addr: '0x926362b451A012F72b34240F36C3bDc163d462e0' },
  { chainId: 80001, addr: '0xd148c38e3eB133CF32E2B65528540D9684De254d' },
];

