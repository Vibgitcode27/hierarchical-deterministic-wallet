import { BIP32Factory } from "bip32";
import ecc from '@bitcoinerlab/secp256k1';
import { ethers } from "ethers";
import { Keypair } from "@solana/web3.js";
import { derivePath } from "ed25519-hd-key";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";

const bip32 = BIP32Factory(ecc);

export const generateSeedPhrase = () => {
    const newMnemonic = generateMnemonic();
    return newMnemonic;
};

interface EtheriumAccount{
    publicKey : string;
    privateKey : string;
}

export const generateEtheriumAccount = (seed: Buffer, accountIndex: number): EtheriumAccount => {
    // Generate Ethereum wallet for this account
    // Standard path for Ethereum (same as MetaMask): m/44'/60'/0'/0/accountIndex
    const root = bip32.fromSeed(seed);
    const ethPath = `m/44'/60'/0'/0/${accountIndex}`;
    const ethChild = root.derivePath(ethPath);
    const ethPrivateKey = ethChild.privateKey ? ethers.hexlify(ethChild.privateKey) : "";
    const ethWallet = new ethers.Wallet(ethPrivateKey);
    const ethPublicKey = ethWallet.address;

    return { publicKey: ethPublicKey, privateKey: ethPrivateKey };
};

interface SolanaAccount{
    publicKey : string;
    privateKey : string;
}

export const generateSolanaAccount = (seed: Buffer, accountIndex: number): SolanaAccount => {
    // Generate Solana wallet for this account
    // Standard path for Solana (same as Phantom): m/44'/501'/accountIndex'
    const solanaPath = `m/44'/501'/${accountIndex}'`;
    const { key: solanaPrivateKey } = derivePath(solanaPath, seed.toString('hex'));
    const solanaKeypair = Keypair.fromSeed(Uint8Array.from(solanaPrivateKey));

    return { publicKey: solanaKeypair.publicKey.toBase58(), privateKey: Buffer.from(solanaKeypair.secretKey).toString("hex") };
};