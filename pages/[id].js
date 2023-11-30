import Head from 'next/head';
import Layout from '../components/layout';
import { getAllIds, getData } from '../lib/data';

export async function getStaticProps({ params }) {
  const itemData = await getData(params.id);
  // console.log(itemData);
  return {
    props: {
      itemData
    }
  };
}

export async function getStaticPaths() {
  const paths = await getAllIds();
  console.log("Paths:", paths);
  return {
    paths,
    fallback: false
  };
}

export default function Entry({ itemData }) {
  return (
    <Layout>
      <article className="card col-6">
        <div className="card-body">
          {console.log(itemData.id)}
          <h5 className="card-title">{itemData.id}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{itemData.post_title}</h6>
           <div className="card-text" dangerouslySetInnerHTML={{__html: itemData.post_content}} />
        </div>
      </article>
    </Layout>
  );
}


/*
<a href={'mailto:' + itemData.email} className="card-link">{itemData.email}</a> */ 

