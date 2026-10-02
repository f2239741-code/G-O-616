import React, { useState } from 'react';
import { Wallet, ShieldCheck, Power, Flame, RefreshCw, ExternalLink } from 'lucide-react';
import { useUserStore } from '../../store/useUserStore';
import { formatAddress } from '../../lib/utils';
import { Button } from '../ui/button';
import { Dialog } from '../ui/dialog';
import { POLYGON_MAINNET, IGNIS_CONTRACT_METADATA } from '../../lib/web3/polygonConfig';
import { sanctumAudio } from '../../lib/audioEngine';
import { showToast } from '../ui/toast';

export const WalletConnector: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { session, connectWallet, disconnectWallet, stakeIgnis } = useUserStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stakeAmount, setStakeAmount] = useState('250');
  const [isStaking, setIsStaking] = useState(false);

  const handleConnect = async () => {
    sanctumAudio.playClick();
    await connectWallet();
    showToast('Polygon Wallet Connected', 'Sovereign address verified on chain 137', 'success');
  };

  const handleStake = async (e: React.FormEvent) => {
    e.preventDefault();
    const amt = Number(stakeAmount);
    if (!amt || amt <= 0 || amt > session.ignisBalance) return;

    setIsStaking(true);
    try {
      await stakeIgnis(amt);
      showToast('IGNIS Staked Successfully', `Staked ${amt} IGNIS on Polygon`, 'sigil');
      setIsModalOpen(false);
    } catch {
      showToast('Staking Failed', 'Insufficient funds or network timeout', 'error');
    } finally {
      setIsStaking(false);
    }
  };

  return (
    <div className={`flex items-center gap-2 font-mono ${className}`}>
      {session.isWalletConnected && session.walletAddress ? (
        <div className="flex items-center gap-2 bg-[#121218] border border-[#272738] rounded-xl px-3 py-1.5 shadow-md">
          <div className="flex items-center gap-1.5 text-xs text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold">{formatAddress(session.walletAddress)}</span>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="text-[10px] bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded transition cursor-pointer"
          >
            Manage
          </button>

          <button
            onClick={() => {
              sanctumAudio.playClick();
              disconnectWallet();
              showToast('Wallet Disconnected', 'Logged out of Polygon Web3 layer', 'warning');
            }}
            className="text-neutral-500 hover:text-rose-400 p-0.5"
            title="Disconnect"
          >
            <Power className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <Button
          variant="outline"
          size="sm"
          onClick={handleConnect}
          className="text-xs border-amber-500/30 hover:border-amber-400 text-amber-300"
        >
          <Wallet className="w-3.5 h-3.5 text-amber-400" />
          <span>Connect Polygon</span>
        </Button>
      )}

      {/* Staking & Web3 Management Dialog */}
      <Dialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Polygon IGNIS Sovereign Vault"
        description="Non-custodial cryptographic staking and governance matrix."
      >
        <div className="space-y-4 font-mono text-xs">
          <div className="p-3 bg-[#161622] rounded-xl border border-[#2c2c40] space-y-2">
            <div className="flex justify-between text-neutral-400">
              <span>CONNECTED WALLET</span>
              <span className="text-white font-bold">{session.walletAddress}</span>
            </div>
            <div className="flex justify-between text-neutral-400">
              <span>NETWORK</span>
              <span className="text-purple-300">{POLYGON_MAINNET.chainName}</span>
            </div>
            <div className="flex justify-between text-neutral-400">
              <span>IGNIS LIQUID BALANCE</span>
              <span className="text-amber-300 font-bold">{session.ignisBalance} IGNIS</span>
            </div>
            <div className="flex justify-between text-neutral-400">
              <span>CURRENTLY STAKED</span>
              <span className="text-emerald-300 font-bold">{session.stakedIgnis} IGNIS</span>
            </div>
          </div>

          <form onSubmit={handleStake} className="space-y-3 bg-[#111118] p-3.5 rounded-xl border border-[#22222f]">
            <label className="block text-neutral-300 text-xs font-semibold">Stake IGNIS for Yield & Oracle Boost</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                max={session.ignisBalance}
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
                className="flex-1 bg-[#181824] border border-[#2d2d40] rounded-lg px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-amber-400"
              />
              <Button
                type="submit"
                variant="amber"
                size="md"
                disabled={isStaking || Number(stakeAmount) > session.ignisBalance}
              >
                {isStaking ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Flame className="w-3.5 h-3.5" />}
                <span>Stake</span>
              </Button>
            </div>
            <p className="text-[10px] text-neutral-400 font-sans">
              Staked tokens yield 14.2% APY and unlock zero-gas Oracle card casting.
            </p>
          </form>

          <div className="text-[10px] text-neutral-400 flex items-center justify-between pt-1">
            <span>CONTRACT: {IGNIS_CONTRACT_METADATA.contractAddress.slice(0, 10)}...</span>
            <a
              href="https://polygonscan.com"
              target="_blank"
              rel="noreferrer"
              className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              Polygonscan <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>
      </Dialog>
    </div>
  );
};
