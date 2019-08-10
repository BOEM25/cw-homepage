import React from 'react'
import PropTypes from 'prop-types'
import { WorkshopTemplate } from '../../templates/workshop'

const WorkshopPreview = ({ entry, widgetFor }) => (
  <WorkshopTemplate
    content={widgetFor('body')}
    description={entry.getIn(['data', 'description'])}
    tags={entry.getIn(['data', 'tags'])}
    title={entry.getIn(['data', 'title'])}
  />
)

WorkshopPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default WorkshopPreview
