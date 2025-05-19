import * as d3 from 'd3';
import type { ProductsLocationsProps } from '../props';

export default (locations: Ref<ProductsLocationsProps[]>) => {
  const baseDimensions = {
    width: 1200,
    height: 800,
  };

  const baseTranslate: [number, number] = [
    baseDimensions.width / 2.0,
    (baseDimensions.height / 2) * 1.4,
  ];

  const locationsMap = ref<null | HTMLElement>(null);
  const { width, height } = useElementBounding(locationsMap);

  const locationCircles = ref<
    Array<{
      location: string;
      circle: d3.Selection<SVGGElement, unknown, null, undefined>;
    }>
  >([]);
  const drawMap = async () => {
    const svg = d3
      .select(locationsMap.value)
      .append('svg')
      .attr('class', 'w-full h-auto')
      .attr('width', width.value)
      .attr('height', height.value || baseDimensions.height)
      .attr('viewBox', `0 0 ${baseDimensions.width} ${baseDimensions.height}`)
      .attr('preserveAspectRatio', 'xMinYMin');

    const projection = d3.geoMercator().scale(180).translate(baseTranslate);

    const path = d3.geoPath().projection(projection);

    const [worldShape] = (await Promise.all([
      // GEOLocation file can be stored on a CDN served locally
      d3.json(
        'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson'
      ), // World shape
    ])) as [worldShape: { features: Iterable<unknown> }];

    // draw map
    svg
      .append('g')
      .selectAll('path')
      .data(worldShape.features)
      .join('path')
      .attr('fill', '#1e1e1e')
      .style('stroke', 'none')
      .attr('d', path);

    locations.value.forEach((location) => {
      const g = svg.append('g');
      // dots
      g.append('circle')
        .attr(
          'cx',
          projection([location.coordinates.long, location.coordinates.lat])[0]
        )
        .attr(
          'cy',
          projection([location.coordinates.long, location.coordinates.lat])[1]
        )
        .attr('r', 6)
        .style('fill', '#ddd')
        .append('title');

      // label
      let textAlignPosition: [number, number, 'left' | 'right' | 'middle'] = [
        0,
        24,
        'middle',
      ];

      if (location.align === 'right') {
        textAlignPosition = [12, 4, 'left'];
      } else if (location.align === 'left') {
        textAlignPosition = [-12, 4, 'right'];
      } else if (location.align === 'top') {
        textAlignPosition = [0, -12, 'middle'];
      }

      g.append('text')
        .attr(
          'x',
          projection([location.coordinates.long, location.coordinates.lat])[0]
        )
        .attr(
          'y',
          projection([location.coordinates.long, location.coordinates.lat])[1]
        )
        .attr('fill', '#ddd')
        .attr('text-anchor', textAlignPosition[2])
        .attr('dx', textAlignPosition[0])
        .attr('dy', textAlignPosition[1])
        .text(location.name);

      // mouseover action
      g.on('mouseover', function () {
        d3.select(this)
          .select('circle')
          .transition()
          .duration(100)
          .attr('r', 10)
          .style('fill', '#fcc603');

        // now reduce the opacity of the other circles
        locationCircles.value
          .filter((circle) => circle.location !== location.name)
          .forEach((circle) => {
            circle.circle.transition().duration(100).style('opacity', 0.5);
          });

        // now draw a line from current location to the hovered location
        if (currentLocation.value != null) {
          const line = svg
            .append('path')
            .attr('id', 'line')
            .attr(
              'd',
              path({
                type: 'LineString',
                coordinates: [
                  [location.coordinates.long, location.coordinates.lat],
                  [currentLocation.value.long, currentLocation.value.lat],
                ],
              })
            )
            .style('fill', 'none')
            .style('stroke', '#fcc603')
            .style('stroke-width', 2);

          // animate the line from the current location to the hovered location
          const totalLength = line.node()?.getTotalLength() || 0;
          line
            .attr('stroke-dasharray', totalLength + ' ' + totalLength)
            .attr('stroke-dashoffset', totalLength)
            .transition()
            // speed can be adjusted here
            .duration(300)
            .attr('stroke-dashoffset', 0);

          // continuiously animate dashed line
          // let dashOffset = 0;
          // requestAnimationFrame(function animate() {
          //   dashOffset = (dashOffset + 0.5) % 100;
          //   line
          //     .attr('stroke-dasharray', '5 5')
          //     .attr('stroke-dashoffset', dashOffset);
          //   requestAnimationFrame(animate);
          // });
        }
      });

      g.on('mouseout', function () {
        d3.select(this)
          .select('circle')
          .transition()
          .duration(100)
          .attr('r', 6)
          .style('fill', '#ddd');

        // now set the opacity of the rest of the circles
        locationCircles.value
          .filter((circle) => circle.location !== location.name)
          .forEach((circle) => {
            circle.circle.transition().duration(100).style('opacity', 1);
          });

        // now remove the line
        svg.select('#line').remove();
      });

      g.style('cursor', 'pointer');

      locationCircles.value.push({
        location: location.name,
        circle: g,
      });
    });
  };

  const changeSize = () => {
    d3.select(locationsMap.value)
      .select('svg')
      .attr('width', width.value)
      .attr('height', height.value || 900);
  };

  const isRenderingMap = ref(true);

  useEventListener(
    window,
    'resize',
    () => {
      if (locationsMap.value != null) {
        changeSize();
      }
    },
    {
      passive: true,
    }
  );

  const drawOwnLocation = (
    latitude: number,
    longitude: number,
    label = 'You'
  ) => {
    const projection = d3.geoMercator().scale(180).translate(baseTranslate);

    // put the user's location on the map
    const svg = d3.select(locationsMap.value).select('svg');

    const g = svg.append('g');

    g.append('circle')
      .attr('cx', projection([longitude, latitude])[0])
      .attr('cy', projection([longitude, latitude])[1])
      .attr('r', 6)
      .style('fill', '#fcc603')
      .append('title');

    g.append('text')
      .attr('x', projection([longitude, latitude])[0])
      .attr('y', projection([longitude, latitude])[1])
      .attr('dx', 12)
      .attr('dy', 4)
      .attr('fill', '#ddd')
      .attr('text-anchor', 'left')
      .text(label);
  };

  const showGeoLocationPrompt = ref(true);
  const currentLocation = ref<null | { lat: number; long: number }>(null);
  const enableGeoLocation = async () => {
    showGeoLocationPrompt.value = false;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          console.log('Latitude: ', latitude);
          console.log('Longitude: ', longitude);

          drawOwnLocation(latitude, longitude);

          currentLocation.value = {
            lat: latitude,
            long: longitude,
          };
        },
        () => {
          console.log('Unable to get location');

          currentLocation.value = {
            lat: 0,
            long: 0,
          };

          drawOwnLocation(0, 0, 'Your browser');
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
      // assume the user is in the middle of the world
      currentLocation.value = {
        lat: 0,
        long: 0,
      };

      drawOwnLocation(0, 0, 'Your browser');
    }
  };

  const onCancelGeoLocation = () => {
    currentLocation.value = {
      lat: 0,
      long: 0,
    };

    drawOwnLocation(0, 0);

    showGeoLocationPrompt.value = false;
  };

  onMounted(async () => {
    isRenderingMap.value = true;
    await drawMap();
    isRenderingMap.value = false;
  });

  return {
    locationsMap,
    isRenderingMap,
    showGeoLocationPrompt,
    onCancelGeoLocation,
    enableGeoLocation,
  };
};
