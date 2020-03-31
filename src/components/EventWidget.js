import React from "react";
import { Link } from "gatsby";

function EventWidget({ events, title, showBookButton }) {
  return (
    <nav className="panel">
      <div className="panel-heading">{title}</div>
      {(events || []).map(event => (
        <div className="panel-block">
          <div className="column is-8">
            <a
              className=""
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {event.date} @ {event.location}
            </a>
          </div>
          <div className="column is-4">
            <a
              className=""
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="button is-link is-outlined is-pulled-right">
                Details
              </button>
            </a>
          </div>
        </div>
      ))}
      <div class="panel-block">
        <Link to="/contact" className="fullWidth">
          {showBookButton && (
            <button className="button is-link is-outlined is-fullwidth">
              Request this Workshop
            </button>
          )}
        </Link>
      </div>
    </nav>
  );
}

export default EventWidget;
