import { Injectable } from '@angular/core';
import { ethers } from "ethers";
import { environment } from '../../environments/environment';
import LiquidityFarmingProxy from 'libs/abi/LiquidityFarmingProxy.json';
import PaymentFarmingProxy from 'libs/abi/PaymentFarmingProxy.json';
import BEP20 from 'libs/abi/BEP20.json';
import BSTToken from 'libs/abi/BSTToken.json';
import BStablePool from 'libs/abi/BStablePool.json';
import BigNumber from 'bignumber.js';

@Injectable({
    providedIn: 'root'
})
export class BootService {

    provider: ethers.providers.JsonRpcProvider;
    pool1Contract: ethers.Contract;
    pool2Contract: ethers.Contract;
    pool3Contract: ethers.Contract;
    liquidityFarmingProxyContract: ethers.Contract;
    paymentFarmingProxyContract: ethers.Contract;
    bstTokenContract: ethers.Contract;
    daiContract: ethers.Contract;
    busdContract: ethers.Contract;
    usdtContract: ethers.Contract;
    usdcContract: ethers.Contract;
    qusdContract: ethers.Contract;

    denominator = new BigNumber(10).exponentiatedBy(18);

    constructor() {
        this.provider = new ethers.providers.JsonRpcProvider(environment.rpc.url);
        this.pool1Contract = new ethers.Contract(environment.pool1.address, BStablePool.abi, this.provider);
        this.pool2Contract = new ethers.Contract(environment.pool2.address, BStablePool.abi, this.provider);
        this.pool3Contract = new ethers.Contract(environment.pool3.address, BStablePool.abi, this.provider);
        this.liquidityFarmingProxyContract = new ethers.Contract(environment.liqudityFarmingProxy.address, LiquidityFarmingProxy.abi, this.provider);
        this.paymentFarmingProxyContract = new ethers.Contract(environment.paymentFarmingProxy.address, PaymentFarmingProxy.abi, this.provider);
        this.bstTokenContract = new ethers.Contract(environment.bstToken.address, BSTToken.abi, this.provider);
        this.daiContract = new ethers.Contract(environment.dai.address, BEP20.abi, this.provider);
        this.busdContract = new ethers.Contract(environment.busd.address, BEP20.abi, this.provider);
        this.usdtContract = new ethers.Contract(environment.usdt.address, BEP20.abi, this.provider);
        this.usdcContract = new ethers.Contract(environment.usdc.address, BEP20.abi, this.provider);
        this.qusdContract = new ethers.Contract(environment.qusd.address, BEP20.abi, this.provider);
    }

    getTvl(): Promise<BigNumber> {
        let pArr = new Array();
        pArr.push(this.daiContract.balanceOf(environment.pool1.address));
        pArr.push(this.busdContract.balanceOf(environment.pool1.address));
        pArr.push(this.usdtContract.balanceOf(environment.pool1.address));
        pArr.push(this.qusdContract.balanceOf(environment.pool2.address));
        pArr.push(this.busdContract.balanceOf(environment.pool2.address));
        pArr.push(this.usdtContract.balanceOf(environment.pool2.address));
        pArr.push(this.usdcContract.balanceOf(environment.pool3.address));
        pArr.push(this.busdContract.balanceOf(environment.pool3.address));
        pArr.push(this.usdtContract.balanceOf(environment.pool3.address));
        return Promise.all(pArr).then(res => {
            let tvl = new BigNumber(0);
            res.forEach(e => {
                tvl = tvl.plus(new BigNumber(e.toString()).div(this.denominator));
            });
            return tvl;
        });
    }

    getBSTMinted(): Promise<BigNumber> {
        return this.bstTokenContract.totalSupply().then(res => {
            return new BigNumber(res.toString()).div(this.denominator);
        });
    }

    getUnclaimedBST(): Promise<BigNumber> {
        let arr = new Array();
        arr.push(this.bstTokenContract.balanceOf(environment.liqudityFarmingProxy.address));
        arr.push(this.bstTokenContract.balanceOf(environment.paymentFarmingProxy.address));
        return Promise.all(arr).then(res => {
            let amt = new BigNumber(0);
            res.forEach(e => {
                amt = amt.plus(new BigNumber(e.toString()).div(this.denominator));
            });
            return amt;
        });
    }
}
