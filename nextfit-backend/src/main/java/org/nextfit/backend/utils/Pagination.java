package org.nextfit.backend.utils;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Pagination {
    int page;
    @JsonProperty("items_per_page")
    int size;
    @JsonProperty("total_elements")
    long totalElements;
    @JsonProperty("total_pages")
    int totalPages;
    int from;
    int to;

    String firstPageUrl;
    String prevPageUrl;
    String nextPageUrl;
    String lastPageUrl;

    List<Link> links;

    public Pagination(int totalPages, int page, int size, long totalElements) {
        this.totalPages = totalPages;
        this.page = page;
        this.size = size;
        this.totalElements = totalElements;
        this.from = (page - 1) * (size) + 1;
        this.to = Math.min((page) * size, (int) totalElements);

        this.firstPageUrl = "/?page=1";
        this.prevPageUrl = page > 1 ? String.format("/?page=%d", page-1) : null;
        this.nextPageUrl = page < totalPages - 1 ? String.format("/?page=%d", page + 1) : null;
        this.lastPageUrl = String.format("/?page=%d", totalPages);

        this.links = new ArrayList<>();
        if (page > 1) links.add(new Link(prevPageUrl, "&laquo; Previous", false, page-1));
        else links.add(new Link("/?page=" + 1, "&laquo; Previous", false, 1));
        for (int i = 0; i < totalPages; i++) {
            String url = String.format("/?page=%d", i + 1);
            String label = Integer.toString(i + 1);
            boolean active = i == page;
            Link link = new Link(url, label, active, i + 1);
            this.links.add(link);
        }
        if (page < totalPages - 1 ) links.add(new Link(nextPageUrl, "Next &raquo;", false, page + 1 ));
        else links.add(new Link(nextPageUrl, "Next &raquo;", false, totalPages ));
    }
}
