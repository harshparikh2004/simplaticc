import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

const MermaidRenderer = ({ chart }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chart) {
      try {
        mermaid.initialize({ startOnLoad: true, theme: 'default' });
        mermaid.render('mermaid-chart', chart, (svgCode) => {
          if (chartRef.current) {
            chartRef.current.innerHTML = svgCode;
          }
        });
      } catch (e) {
        console.error('Error rendering mermaid diagram', e);
      }
    }
  }, [chart]);

  return <div ref={chartRef} className="overflow-auto" />;
};

export default MermaidRenderer;
