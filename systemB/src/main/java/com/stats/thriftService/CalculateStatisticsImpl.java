package com.stats.thriftService;

import java.util.*;

import com.stats.rpc.CalculateStatisticsService;
import com.stats.rpc.StatStruct;
import org.apache.thrift.TException;
import org.springframework.stereotype.Service;

@Service
public class CalculateStatisticsImpl implements CalculateStatisticsService.Iface{
    @Override
    public boolean ping(){
        return true;
    }

    @Override
    public StatStruct calculateStat(java.util.List<java.lang.Integer> input) throws org.apache.thrift.TException{
        int [] inputArr=new int[input.size()];
        for (int i=0; i<input.size(); i++)
        {
            inputArr[i] = input.get(i);
        }
        StatsUtil st = new StatsUtil();
        double mean=st.getStats("mean", inputArr);
        int median=(int)st.getStats("median", inputArr);
        double variance=st.getStats("variance", inputArr);
        double stddev=st.getStats("stddev", inputArr);
        return new StatStruct(mean,median,variance,stddev);
    }

    @Override
    public List<Integer> generateNums() throws TException {
        Random rd = new Random(); // creating Random object
        int max=10,min=0,oddcount=0,tmp=0;
        int len = rd.nextInt(((10 - 2) + 1)) + 2; //picking random length of array (max length = 10)
        int[] arr = new int[len];

        for (int i = 0; i < len; i++) {
            tmp= rd.nextInt(((max - min) + 1)) + min; // storing random integers in an array
            if(tmp%2==1 && oddcount<=len/4) { //relation between odd and even numbers should be even=3*odd
                arr[i] = tmp;
                oddcount++;
            }
            else {
                arr[i] = rd.nextInt(((5 - 0) + 1))*2;  // storing even numbers once odd numbers reaches threshold
            }
        }
        List<Integer> list = new ArrayList<>();
        for (int i : arr) {
            list.add(i);
        }
        return list;
    }

}
