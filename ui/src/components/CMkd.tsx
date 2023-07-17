
import { h, defineComponent, ref } from 'vue';
import '@/components/CMkd.css'

export default defineComponent({
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  h: ref(h), // not a thing
  // this in example is like
  setup(props) {
    
    const text = props.text
    const arr = text.split("\n").filter((s)=>{return s !== ''})

    return () => (
      <div class="c-mkd">
        {arr.map((p)=>{
          return <p key={p}>{p}</p>
        })}
      </div>
    );
  },
});
