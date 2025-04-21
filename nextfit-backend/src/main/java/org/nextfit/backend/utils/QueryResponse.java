package org.nextfit.backend.utils;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class QueryResponse<Type> {
    private List<Type> data;
    private Payload payload;

    public QueryResponse(List<Type> objects, Pagination pagination) {
        this.data = objects;
        this.payload = new Payload(pagination);
    }
}