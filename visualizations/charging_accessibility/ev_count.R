ca_ev_registrations_public <- read_csv("ca_ev_registrations_public.csv") ## Data from: https://www.atlasevhub.com/materials/state-ev-registration-data/#data
county_geoid_map <- read_csv("county_geoid_map.csv")


counties <- unique(ca_ev_registrations_public$`County GEOID`)
count_ev <- numeric(0)
for (i in 1:length(counties)) {
  count_ev[i] <- dim(ca_ev_registrations_public[ca_ev_registrations_public$`County GEOID` == counties[i], ])[1]
}


EV_counts <- data.frame(county_geoid = counties, 
                        counts = count_ev)

EV_counts <- EV_counts[order(EV_counts$county_geoid), ]
EV_counts$county <- county_geoid_map[order(county_geoid_map$GEOID),]$County
EV_counts <- EV_counts[c("county_geoid","county","counts") ]

EV_counts
write.csv(EV_counts, "EVcounts.csv")
