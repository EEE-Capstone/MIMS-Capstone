ca_ev_registrations_public <- read_csv("Downloads/ca_ev_registrations_public.csv")
counties <- unique(ca_ev_registrations_public$`County GEOID`)
count_ev <- numeric(0)
for (i in 1:length(counties)) {
  count_ev[i] <- dim(ca_ev_registrations_public[ca_ev_registrations_public$`County GEOID` == counties[i], ])[1]
}


EV_counts <- data.frame(county_geoid = counties, 
                        counts = count_ev)
EV_counts
write.csv(EV_counts, "EVcounts.csv")
