# Matplotlib hover explanations (adds to the Python glossary).
figsize :: Figure size in inches (width, height) — set it to the printed size.
layout :: "constrained" spaces panels and labels automatically.
color :: Line/marker colour: "C0"…"C9", a name, a hex code or a grey level like "0.5".
label :: Text for this line in the legend.
alpha :: Transparency: 0 invisible, 1 solid.
linewidth :: Line thickness in points.
linestyle :: "-", "--", ":" or "-.".
markersize :: Marker size in points.
fontsize :: Text size in points.
fontweight :: Text weight, e.g. "bold".
rcParams :: Global default settings (fonts, sizes, line widths).
set_title :: Title of one axes.
suptitle :: Title for the whole figure.
set_ylim :: y-axis range; bottom=/top= sets one end.
set_xscale :: x-axis scale: "linear" or "log".
set_aspect :: "equal" makes one unit the same length on x and y (needed for Nyquist plots).
invert_xaxis :: Flips the x-axis direction.
tick_params :: Tick size, direction, colour and label size.
xaxis :: The x-axis object, for locators and formatters.
set_major_locator :: Controls where major ticks go.
MultipleLocator :: Ticks at multiples of a step. From matplotlib.ticker.
ticklabel_format :: Plain or scientific tick labels.
set_xticks :: Exact tick positions.
set_xticklabels :: Text for each tick.
spines :: The frame lines around an axes; spines[["top", "right"]].set_visible(False) removes two.
set_visible :: Shows or hides an element.
style :: Named sets of defaults; plt.style.use(...).
sharex :: Panels share one x-axis: zooming one zooms all.
axs :: Array of axes from plt.subplots(rows, cols).
flat :: Iterates over every panel in a grid of axes.
subplot_mosaic :: Lays out named panels from a picture-like list.
gridspec_kw :: Extra grid options such as height_ratios.
transform :: Coordinate system for text/shapes.
transAxes :: Axes coordinates: (0, 0) bottom-left, (1, 1) top-right.
twinx :: Second y-axis sharing the same x — for two units on one plot.
twiny :: Second x-axis sharing the same y.
get_legend_handles_labels :: The lines and labels of an axes — combine two axes' lists to make one legend.
set_zorder :: Drawing order: higher draws on top.
get_zorder :: Current drawing order.
patch :: The axes background rectangle.
axvline :: Vertical line across the axes, at an x value.
axhline :: Horizontal line across the axes, at a y value.
axvspan :: Shaded vertical band between two x values (e.g. a motion window).
axhspan :: Shaded horizontal band between two y values.
text :: Writes text at a position.
va :: Vertical alignment: "top", "center", "bottom".
ha :: Horizontal alignment: "left", "center", "right".
xy :: The point an annotation refers to.
xytext :: Where the annotation text sits.
arrowprops :: Arrow style for annotate.
arrowstyle :: e.g. "->" or "-|>".
yerr :: Error bar sizes.
fmt :: Marker/line format for errorbar, e.g. "o".
capsize :: Width of error-bar caps.
bar :: Bar chart.
boxplot :: Box-and-whisker plot of one or more groups.
bins :: Number of histogram bars (or their edges).
density :: Normalise a histogram so its area is 1.
origin :: imshow: "lower" puts row 0 at the bottom.
extent :: imshow: real-world limits [x0, x1, y0, y1].
aspect :: "auto" lets an image stretch to fill the axes.
pcolormesh :: Colour grid from x, y, z values.
shading :: pcolormesh: how cells are coloured.
get_cmap :: A colormap by name; call it with 0–1 to get colours.
cmap :: Colormap to use for colour-coded values.
ScalarMappable :: Lets you add a colorbar for lines you coloured yourself.
Normalize :: Maps data values to 0–1 for a colormap.
cm :: Matplotlib's colormap module.
loglog :: Plot with both axes logarithmic.
semilogx :: Plot with a logarithmic x-axis.
semilogy :: Plot with a logarithmic y-axis.
step :: Staircase plot — good for DAC levels.
fill_between :: Shades between two curves (e.g. mean ± std).
frameon :: Draw a box around the legend (False hides it).
bbox_to_anchor :: Places the legend relative to the axes, e.g. outside.
ncol :: Number of legend columns.
dpi :: Dots per inch for PNGs — 300 for print.
bbox_inches :: "tight" trims empty margins when saving.
transparent :: Saves without a background.
update :: Changes several settings at once (rcParams.update).
gca :: Get the current axes.
gcf :: Get the current figure.
xlabel :: pyplot version of ax.set_xlabel — acts on the current axes.
ylabel :: pyplot version of ax.set_ylabel.
title :: pyplot version of ax.set_title.
set_data :: Replaces a line's data (for fast live updates).
relim :: Recomputes data limits after set_data.
autoscale_view :: Rescales axes to the new limits.
pause :: Redraws and waits — keeps live plots responsive.
ion :: Interactive mode: figures update without plt.show().
widgets :: Simple GUI controls inside a figure.
Button :: A clickable button in a figure.
Slider :: A draggable slider in a figure.
add_axes :: Adds an axes at [left, bottom, width, height] in figure fractions.
on_clicked :: Function to call when a Button is clicked.
on_changed :: Function to call when a Slider moves.
valinit :: Starting value of a slider.
valstep :: Slider step size.
