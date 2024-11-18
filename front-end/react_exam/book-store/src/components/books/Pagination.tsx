import { styled } from 'styled-components';
import { Pagination as IPagination } from '../../models/pagination.model';
import Button from '../common/Button';
import { useSearchParams } from 'react-router-dom';
import { QUERYSTRING } from '../../constants/querystring';

interface Props {
  pagination : IPagination;
}

const Pagination = ({pagination} : Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { total_count, page, size} = pagination;
  const pages = Math.ceil(total_count/size)
  const handleClickPage = (page : number) => {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set(QUERYSTRING.PAGE, page.toString());
    setSearchParams(newSearchParams);
  }
  return (
    <PaginationStyle>
      {
        pages > 0 && (
          <ol>
            {
              Array(pages).fill(0).map((_, index) => (
                <li>
                  <Button key = {index} size = "small" scheme={index + 1 === page ? 'primary' : 'normal'} onClick={() => handleClickPage(index + 1)}>
                    {index + 1}
                  </Button>
                </li>
              ))
            }
          </ol>
        )
      }
    </PaginationStyle>
  );
}

const PaginationStyle = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding : 24px 0;

  ol {
    display: flex;
    gap : 8px;
    list-style: none;
    padding : 0;
    margin : 0;
  }
  
`;

export default Pagination;