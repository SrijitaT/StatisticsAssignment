package com.stats.thriftService;

import java.util.Arrays;

public class StatsUtil {
    public double getMean(int arr[]){
        int i,sum=0,len=arr.length;
        for(i=0;i<len;i++)
            sum+=arr[i];
        return (double)sum/len;
    }
    public double getStats(String action,int arr[]){
        double res=0.0,mean=0.0;
        int i=0,sum=0,len=arr.length;
        switch(action){
            case "mean":
                res=getMean(arr);
                break;
            case "median":{
                Arrays.sort(arr);
                if(len%2==1)//odd
                {
                    res=arr[(len-1)/2];
                }else{
                    res=(arr[len/2]+arr[(len/2)-1])/2;
                }
                break;
            }
            case "stddev":
            case "variance":
                mean = getMean(arr);
                for (i = 0; i < len; i++)
                    sum += Math.pow((arr[i] - mean),2);
                res=(double)sum/len;
                if(action.equals("stddev")) {
                    res = Math.sqrt(res);
                }
        }
        return res;
    }
}
