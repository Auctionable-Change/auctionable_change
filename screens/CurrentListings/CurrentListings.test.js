import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';
import CurrentListings from './CurrentListings';
import { StoreProvider } from '../../store'
import {expect, it} from '@jest/globals';
import renderer from "react-test-renderer";
import { fetchItems } from '../apiCalls'

describe('CurrentListings', () => {
  it('should render', () => {
    const tree = renderer.create(
      <StoreProvider>
        <CurrentListings/>
      </StoreProvider>).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('should filter listings by category', () => {

    const listings =  [
      {
          "id": 16,
          "title": "Melting iced coffee",
          "description": "Hurry before it’s watered down",
          "price": 1.0,
          "donor": "Lauren",
          "donor_email": "Foxymeatball@aol.com",
          "status": "available",
          "category": "other",
          "charity": "Boys & Girls Clubs of Central Alabama",
          "charity_url": "https://www.charitynavigator.org/?bay=search.summary&orgid=13339&utm_source=DataAPI&utm_content=6bc9f3c8",
          "charity_score": 4,
          "image": "http://res.cloudinary.com/djk5anakm/image/upload/v1595857701/pwc5fwragfvoqeow2ryw.jpg",
          "bids": []
      },
      {
          "id": 17,
          "title": "Melting iced coffee",
          "description": "Hurry before it’s watered down",
          "price": 1.0,
          "donor": "Lauren",
          "donor_email": "Foxymeatball@aol.com",
          "status": "available",
          "category": "other",
          "charity": "Boys & Girls Clubs of Central Alabama",
          "charity_url": "https://www.charitynavigator.org/?bay=search.summary&orgid=13339&utm_source=DataAPI&utm_content=6bc9f3c8",
          "charity_score": 4,
          "image": "http://res.cloudinary.com/djk5anakm/image/upload/v1595857701/pwc5fwragfvoqeow2ryw.jpg",
          "bids": []
      },
      {
          "id": 18,
          "title": "bowl and spoon",
          "description": "Great for cereal ",
          "price": 1.0,
          "donor": "Lauren",
          "donor_email": "Foxymeatball@aol.com",
          "status": "available",
          "category": "home",
          "charity": "Boys & Girls Clubs of Central Alabama",
          "charity_url": "https://www.charitynavigator.org/?bay=search.summary&orgid=13339&utm_source=DataAPI&utm_content=6bc9f3c8",
          "charity_score": 4,
          "image": "http://res.cloudinary.com/djk5anakm/image/upload/v1595862005/ifdtga4y0l3n17d5libd.jpg",
          "bids": []
      }
    ]
    const { getByText } = render(
      <StoreProvider>
        <CurrentListings />
      </StoreProvider>
    )
    
  })
})