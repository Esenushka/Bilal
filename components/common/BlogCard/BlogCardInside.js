import Head from 'next/head';
import Header from '../Header/Header.js';

export default function BlogCardInside({ title, des, imgUrl }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <div className="container">
        <div className=" post-block-top">
          <div className="block-top">
            <h2>{title}</h2>
          </div>
          <div className="post-img">
            <img src={imgUrl} alt="Post image" />
          </div>
        </div>
      </div>
      <div className="container">
        <p className="post-content">
          Lorem ipsum dolor sit amet consectetur adipiscing elit erat, ornare sed quam luctus
          vivamus neque blandit dictum molestie, arcu ligula eu nam mauris rutrum nisi. Fermentum
          vivamus ex laoreet elementum purus ultrices et, netus ad sed dapibus elit litora, eu risus
          aptent posuere quis dolor. Quisque nostra arcu penatibus taciti luctus fermentum hac
          placerat lorem facilisi, magna montes integer semper consequat dapibus bibendum ultricies
          nascetur. Ac ultricies mollis faucibus scelerisque habitant convallis litora nec, mi
          porttitor rutrum metus cras egestas aptent congue ornare, gravida habitasse a lobortis
          finibus tristique posuere.
          <br />
          <br />
          Integer pellentesque ultricies ligula tempor placerat in nullam, hac fringilla ac dictum
          felis blandit venenatis, vel ridiculus condimentum feugiat est eu. Facilisi sed volutpat
          nibh dignissim aliquet felis praesent feugiat, tellus posuere elit integer maximus primis
          accumsan risus enim, condimentum eget ultricies dapibus vitae tortor ut. Dis ac nullam
          ipsum viverra quam tristique justo fames, aptent pulvinar habitant feugiat integer
          facilisi penatibus, class mattis sollicitudin himenaeos quis semper dui. Tortor sagittis
          quisque a etiam purus pharetra arcu eget congue himenaeos luctus facilisis nullam velit,
          amet interdum mattis hendrerit leo maximus dignissim duis proin nisl taciti egestas.
          Sollicitudin nam himenaeos lobortis magnis volutpat purus senectus netus blandit, congue
          fames ligula morbi risus in augue non adipiscing lectus, velit iaculis mattis praesent
          elementum nisi potenti venenatis. Mus lacinia curabitur euismod posuere risus in, nulla
          tempor mauris bibendum.
          <br />
          <br />
          Penatibus orci velit fringilla aptent felis vehicula mattis accumsan, vestibulum lacus
          lorem arcu neque ut sit gravida, molestie morbi sagittis lacinia ex interdum massa.
          Efficitur proin massa enim velit vehicula arcu feugiat condimentum augue phasellus
          lobortis id elementum, mauris eros aenean viverra dolor leo cursus in lacus nibh eleifend.
          Elit malesuada molestie ex tincidunt semper lobortis velit vivamus felis sagittis,
          facilisis duis porta porttitor placerat hendrerit primis ipsum eleifend ligula ad, arcu
          litora ante cras hac orci eros facilisi nam. Nam nibh aliquam facilisis a mattis ut
          hendrerit porttitor pretium amet, pulvinar lacinia duis consequat praesent penatibus fames
          netus erat. Eros egestas facilisi aptent nullam mattis urna inceptos, rhoncus netus
          vehicula montes morbi penatibus, dictum pharetra sapien ridiculus arcu justo.
        </p>
      </div>
    </div>
  );
}
