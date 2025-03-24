package dev.siea.site.handlers;

import com.pixelservices.flash.components.RequestHandler;
import com.pixelservices.flash.lifecycle.Request;
import com.pixelservices.flash.lifecycle.Response;
import com.pixelservices.flash.models.HttpMethod;
import com.pixelservices.flash.models.RouteInfo;

@RouteInfo(endpoint = "/newsletter/preview", method = HttpMethod.GET)
public class NewsLetterTodayHandler extends RequestHandler {
    public NewsLetterTodayHandler(Request req, Response res) {
        super(req, res);
    }

    @Override
    public Object handle() {
        return "Today's newsletter";
    }
}
