package com.appointment.booking.config;

import static com.appointment.booking.utils.WsConstants.WS_TOPICS;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
@Slf4j
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    private final String[] wsAllowedOrigins;

    public WebSocketConfig(@Value("${websocket.allowed.origins}") String[] wsAllowedOrigins) {
        this.wsAllowedOrigins = wsAllowedOrigins;
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws").
            setAllowedOriginPatterns(wsAllowedOrigins);
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker(WS_TOPICS);
        registry.setApplicationDestinationPrefixes("/ws");
    }

}
