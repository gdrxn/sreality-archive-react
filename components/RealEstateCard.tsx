import Image from "next/image";
import { IRealEstate } from "../types";
type Props = { product: IRealEstate };

const RealEstateCard = (props: Props) => {
	return (
		<li>
			<div>
				<Image
					className="w-72 h-48"
					src={props.product.images[0]}
					height={1000}
					width={1000}
					alt={"Real estate photo"}
				/>
				<h2>{props.product.name}</h2>
				<h3>{props.product.location}</h3>
				<h4>{`${props.product.price} Kč`}</h4>
			</div>
		</li>
	);
};

export default RealEstateCard;
