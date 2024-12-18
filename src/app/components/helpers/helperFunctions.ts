import { BIP32Factory } from "bip32";
import ecc from '@bitcoinerlab/secp256k1';
import { Keypair } from "@solana/web3.js";
import { derivePath } from "ed25519-hd-key";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";

export const generateSeedPhrase = () => {
    const newMnemonic = generateMnemonic();
    return newMnemonic;
};