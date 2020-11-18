/**
 * Settings pages tool bar
 */
import React from 'react'
import SectionToolBar from './SectionToolBar'

export const HelpToolBar = () => (
  <SectionToolBar
    title={'Help & FAQ'}
  />
)

export const NewGroupToolBar = () => (
  <SectionToolBar 
    title={'New Group'}
  />
)

export const NewBatchToolBar = () => (
  <SectionToolBar 
    title={'New Batch - Bulk Deactivate Wipro Users'}
    returnLink = {'/batches'}
  />
)

export const NewConnectToolBar = () => (
  <SectionToolBar 
    title={'New Connect - Edit Project Information'}
    returnLink = {'/connect'}
  />
)

