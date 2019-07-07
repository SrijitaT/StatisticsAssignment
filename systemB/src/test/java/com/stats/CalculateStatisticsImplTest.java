package com.stats;

import com.stats.rpc.StatStruct;
import com.stats.thriftService.CalculateStatisticsImpl;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import java.util.*;

import static org.mockito.Mockito.mock;

@SpringBootTest
@ActiveProfiles("test")
@RunWith(SpringJUnit4ClassRunner.class)
public class CalculateStatisticsImplTest {

    private CalculateStatisticsImpl calStatImpl;
    @Before
    public void setUp(){
        calStatImpl = new CalculateStatisticsImpl();
    }
    @Test
    public void calculateStatisticsTest() throws org.apache.thrift.TException{
        List<Integer> list = new ArrayList<Integer>();
        for(int i=1;i<=5;i++)
        list.add(i);
        StatStruct s = calStatImpl.calculateStat(list);
        Assert.assertEquals(new StatStruct(3.0,3,2.0,1.4142135623730951), s);
    }
    public void randomNumGenerationmatch_shouldfail() throws org.apache.thrift.TException{
        List<Integer> randomListRes = new ArrayList<Integer>();
        randomListRes = calStatImpl.generateNums();
        List<Integer> randomList = new ArrayList<Integer>();
        randomList.add(2);
        randomList.add(4);
        randomList.add(6);
        Assert.assertNotEquals(randomListRes,randomList);
    }
}