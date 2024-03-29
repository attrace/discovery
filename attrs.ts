import { ethers } from 'ethers';
import { NetworkContract } from './types';

export async function getATTRs(): Promise<NetworkContract[]> {
  return rows.map(d => {
    return {
      ...d,
      address: ethers.utils.getAddress(d.address),
    }
  })
}

// Actual definitions without checks
const rows: NetworkContract[] = [
  { chainId: 1, address: '0x44e2deC86B9F0e0266E9AA66e10323A2bd69CF9A' },
  { chainId: 137, address: '0x0335DeFC8A1977b99488e0b5f5c6bc3D44fAcdD4' },
  { chainId: 4, address: '0x926362b451A012F72b34240F36C3bDc163d462e0' },
  { chainId: 5, address: '0x926362b451A012F72b34240F36C3bDc163d462e0' },
  { chainId: 80001, address: '0xd148c38e3eB133CF32E2B65528540D9684De254d' },
  { chainId: 56, address: '0x0f07ffd690dffd9a0ce8274116830cf62d086b5f' },
];