# Overview

I plan to use charts pretty heavily in this app, so I'm really trying to take my time and get them right, especially because I want to make working with our charting code as easy as possible so that I can quickly spin up new charts on the fly with all kinds of different things in them.

To this end, it's important to break down the charting process into two distinct parts:

- The foundation of the chart itself, IE the period controls, legend creation, axes, crosshairs, all the stuff that is common to all charts
- The specific chart data, IE a percentage change chart or a candlestick chart.

This overview will focus on the first part, and then there should be separate docs for each specific type of chart (assuming they're complicated enough to warrant them).

## 1. Fetch the Data

Most of the process here is either handled on the back end or specific to the chart type. However, it is worth pointing out that the process actually starts in the ChartHolder component, which fetches the data and then once it's fetched mounts the charts

The ChartHolder component also hosts the context for the chart legend (what elements are in it and whether any of them have been selected to highlight that part of the chart).

The legend and the period buttons also live inside ChartHolder, along with the Chart component.

## 2. Set up the Canvases

We use two canvases for our charts. The first is for the chart itself, and does the actual drawing of the data. The second is the shadowChart, which handles drawing any annotations on top of the chart, like the crosshairs.

## 3. Determine the range of the data in both dimensions

The first step in building our chart is creating the axes, and the first step in creating the axes is figuring out what their high and low values will be.

For aesthetics' sake, we create the grid lines within the chart at intervals chosen from a pre-selected list. That is, it's ugly to have lines every, for instance, 27 minutes, so instead we round the line interval to 30 minutes and use that.

Thus for drawing our gridlines we just need the size of the chart (found in the last step) and the range of the data. Then we can figure out which interval we're going to use for our lines and make a list of all the lines we're going to draw and their labels.

## 4. Identify the labels each axis will need

Now that we have a list of all the labels, the next step is to apply the labels.

The only tricky part here is making sure no labels overlap.

Because our first and last labels will be the minimum and maximum values from the data, but the rest of the labels will be evenly spaced intervals, we might have overlap on either end as one of the minimum or maximum values might be too close to the nearest interval. So we have to check for that and skip the interval label.

The trickiest part here is determining the steps for the x axis. Our data is likely to have big gaps in time between datapoints when the market is closed, but we don't want to leave gaps in our chart during these times. So the position of a time on the x axis will be determined by its index in our data array, not by its time.

If you imagine the following list of times

[0, 1, 2, 3, 4, 5, 10, 11, 12, 13, 14]

We would put 5 at the halfway point because it is halfway through the array, even though it is only 1/3 of the way to 14.

## 5. Figure out the dimensions of the data area

Now that we have our axis labels, we can figure out how much space they'll need to take up.

This is easy for the X-axis labels, which just need one line of text.

But the Y-axis labels are of variable length, so we need to figure out how much space to allow for them. Currently we're doing that by taking the first and last ones (assuming they'll at least have the largest digit count of any of the labels), then using the longer one of them, then adding some padding, and using that to determine how much space we need on the side of the chart.

## 6. Make a list of datapoints and their coordinates

Before we draw the actual chart, we want to create a register of all the datapoints that will be on it. Not only will this make drawing the chart much simpler, it will also allow us to add interactivity to the chart.

For instance, if someone hovers over a candle, we can show a little pop up box containing the data for that candle. if they hover over a line in a comparison chart, we can show the value at that point and also highlight that line.

## 7. Draw the chart itself

This part will be left up to the docs for each specific chart type.

Have fun!
