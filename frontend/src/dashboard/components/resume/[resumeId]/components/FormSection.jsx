import React, { useState } from 'react'
import PersonalDetailsForm from './forms/PersonalDetailsForm'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Home, LayoutGrid } from 'lucide-react'
import SummerForm from './forms/SummerForm'
import ExperieanceForm from './forms/ExperieanceForm'
import EducationForm from './forms/EducationForm'
import SkillForm from './forms/SkillForm'
import { Link, useNavigate, useParams } from 'react-router-dom'

const FormSection = () => {

  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(false);
  const navigate = useNavigate();
  const param = useParams();
  const { resumeId } = param;
  return (
    <div>
      <div className='flex justify-between items-center'>
        <div className='flex gap-5'>
          <Link to={"/dashboard"}>
            <Button> <Home /></Button>
          </Link>
          <Button variant='outline' size="sm" className="flex gap-2">
            <LayoutGrid />
            Theme</Button>
        </div>
        <div className='flex gap-2'>
          {activeFormIndex > 1 && <Button size='sm'
            onClick={() => setActiveFormIndex(activeFormIndex - 1)}
          ><ArrowLeft /></Button>}
          <Button className="flex gap-2 size='sm'"
            disabled={!enableNext}
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
          >Next <ArrowRight /></Button>
        </div>
      </div>

      {/* personal information */}
      {activeFormIndex == 1 ? <PersonalDetailsForm enableNext={(v) => setEnableNext(v)} />
        : activeFormIndex == 2 ? <SummerForm enableNext={(v) => setEnableNext(v)} />
          : activeFormIndex == 3 ? <ExperieanceForm enableNext={(v) => setEnableNext(v)} /> :
            activeFormIndex == 4 ? <EducationForm /> :
              activeFormIndex == 5 ? <SkillForm /> :
                activeFormIndex == 6 ? navigate('/myresume/' + resumeId + '/view') : null
      }
      {/* summary */}
      {/* experiances */}
      {/* education */}
      {/* skills */}
    </div>
  )
}

export default FormSection