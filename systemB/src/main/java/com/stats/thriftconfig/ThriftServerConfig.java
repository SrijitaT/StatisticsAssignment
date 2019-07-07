package com.stats.thriftconfig;

import com.stats.rpc.CalculateStatisticsService;
import com.stats.thriftService.CalculateStatisticsImpl;
import org.apache.thrift.protocol.TBinaryProtocol;
import org.apache.thrift.protocol.TProtocolFactory;
import org.apache.thrift.server.TServlet;
import org.mockito.Mockito;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

@Configuration
public class ThriftServerConfig {
    @Bean
    public TProtocolFactory tProtocolFactory() {
        return new TBinaryProtocol.Factory();
    }

    @Bean
    public ServletRegistrationBean thriftBookServlet(TProtocolFactory protocolFactory, CalculateStatisticsImpl handler) {
        TServlet tServlet = new TServlet(new CalculateStatisticsService.Processor<>(handler), protocolFactory);

        return new ServletRegistrationBean(tServlet, "/stats");
    }
}
